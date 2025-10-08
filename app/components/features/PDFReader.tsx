import { useContext, useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Button from '../ui/Button';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import SuspenseBlock from '../ui/SuspenseBlock';
import debounce from '~/utils/debounce';
import clsx from 'clsx';
import { createUseGesture, pinchAction } from '@use-gesture/react';
import { GlobalContext } from '~/root';
import { Link, useNavigate } from '@remix-run/react';
import { FiDownload } from 'react-icons/fi';

type Props = {
  url: string,
}

export default function PDFReader({ url }: Props) {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null)
  const [pdfJS, setPdfJS] = useState<any>(null)
  const [pages, setPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [status, setStatus] = useState<"idle" | "loading">("loading")
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const useGesture = createUseGesture([pinchAction]);
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();

  const renderPage = async (num: number) => {
    // turn on spinner
    setStatus("loading");

    // get the canvas
    const canvas = canvasRef.current as HTMLCanvasElement;
		const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

    // get the page and set the viewport in proper scale
    const page = await (pdfDoc as PDFDocumentProxy).getPage(num);
    const viewport = page.getViewport({ scale: 1 * 3 * zoom });
    
    // Render PDF page into canvas context.
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvas.style.width = (wrapperRef.current.offsetWidth * zoom + "px");
		const renderContext = { canvasContext, viewport };
		await page.render(renderContext);
    
    // get the text content
    //const textContent = await page.getTextContent();

    // Assign CSS to the textLayer element
    // textLayer = textLayerRef.current as HTMLDivElement;
    
    // remove current content
    //textLayer.innerHTML = '';

    // set the textLayer to the same size as the canvas
    //textLayer.style.left = canvas.offsetLeft + 'px';
    //textLayer.style.top = canvas.offsetTop + 'px';
    //textLayer.style.height = canvas.offsetHeight + 'px';
    //textLayer.style.width = canvas.offsetWidth + 'px';
    
    // Pass the data to the method for rendering of text over the pdf canvas.
    /*await pdfJS.renderTextLayer({
      textContentSource: textContent,
      container: textLayer,
      viewport: viewport,
      textDivs: []
    });*/

    // turn off spinner
    setStatus("idle");
  }
  
  useEffect(() => {
    const handleResize = debounce(() => {
      renderPage(currentPage);
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [pdfDoc]);

	useEffect(() => {
		(async function () {

			// We import this here so that it's only loaded during client-side rendering.
			const pdfJS = await (await import('pdfjs-dist')).default;
      setPdfJS(pdfJS);
			pdfJS.GlobalWorkerOptions.workerSrc =
				window.location.origin + '/pdf.worker.min.js';

      // Fetch the PDF document from the URL using promises and save it to the state.
			const pdf = await pdfJS.getDocument(url).promise;
      setPdfDoc(pdf);

      // save the total number of pages
      setPages(pdf.numPages)
  
		})();
	}, []);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, zoom]);

  useEffect(() => {
    const elem = canvasRef.current;

    // if the element is not available, return
    if (!elem)
      return
    
    // prevent default gestures
    const handler = (e: Event) => e.preventDefault()
    elem.addEventListener('gesturestart', handler)
    elem.addEventListener('gesturechange', handler)
    elem.addEventListener('gestureend', handler)
    return () => {
      elem.removeEventListener('gesturestart', handler)
      elem.removeEventListener('gesturechange', handler)
      elem.removeEventListener('gestureend', handler)
    }
  }, [canvasRef])

  useGesture(
    {
      onPinch: ({ offset: [newScale] }) => {
        // trim newScale to one decimal
        newScale = Math.round(newScale * 10) / 10;
        if (status === "idle") setZoom(newScale);
      },
    },
    {
      target: canvasRef,
      pinch: { scaleBounds: { min: 0.5, max: 2 }, rubberband: true },
    }
  )

	return (
    <section
      ref={wrapperRef}
      className={clsx(
        "absolute z-60 top-0 left-0 bg-light min-h-screen w-full",
        "sm:static",
        "dark:bg-zinc-900"
      )}
    >
      <div
        className={clsx(
          "fixed z-20 w-full flex items-center justify-between px-2 border-b bg-light",
          "sm:px-0 sm:border-b-none sm:static",
          "dark:bg-zinc-900"
        )}
      >
        <div className="flex">
          <Button
            variant="default"
            className="mx-1"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-1" /> {t("common.return")}
          </Button>
        </div>
        <span>{Math.floor(zoom * 100)}%</span>
        <span>{currentPage}/{pages}</span>
        <div className="flex">
          <a
            href={url}
            download
          >
            <Button
              variant="default"
              className="mx-1"
            >
              <FiDownload />
            </Button>
          </a>
          <Button
            variant="default"
            disabled={currentPage === 1 || status !== "idle"}
            className="mx-1"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaArrowLeft />
          </Button>
          <Button
            variant="default"
            disabled={currentPage === pages || status !== "idle"}
            className="mx-1"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
      <SuspenseBlock
        status={status}
      >
        <div className="overflow-auto pt-20 sm:pt-0 relative">
          <canvas ref={canvasRef} />
          {/*<div ref={textLayerRef} className="textLayer pdfjs-text-layer" />*/}
        </div>
      </SuspenseBlock>
    </section>
  );
}
