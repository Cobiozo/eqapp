import type { ChatMessage, User } from "@prisma/client";
import AdminPageHeader from "../ui/AdminPageHeader";
import { useFetcher } from "@remix-run/react";
import WysiwygField from "../ui/Wysiwyg";
import Button from "../ui/Button";
import { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "~/root";
import { FiSend } from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import clsx from "clsx";
import WysiwygGeneratedContent from "../layout/WysiwygGeneratedContent";

type Props = {
  name: string;
  roomId: string;
  ownerId: string;
  messages: (ChatMessage & {
    user: User;
  })[]
}

export default function Chat({ name, roomId, messages, ownerId }: Props) {
  const fetcher = useFetcher();
  const { t, user } = useContext(GlobalContext);
  const messagesWrapperRef = useRef<HTMLUListElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (messagesWrapperRef.current) {
      setTimeout(() => {
        messagesWrapperRef.current.scrollTo({
          top: messagesWrapperRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 200);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-250px)]">
      <AdminPageHeader>
        {name}
      </AdminPageHeader>
      <ul className="flex-1 overflow-y-auto" ref={messagesWrapperRef}>
        {messages.map(i => (
          <li key={i.id}>
            <div className="flex gap-4 mb-4 pb-2 border-b border-light-border dark:border-medium-darker">
              <div className="shrink-0">
                <img 
                  src={ i.user.avatar ? "/uploads/" + i.user.avatar : '/images/no-avatar.webp'}
                  className="w-14 h-14 rounded-lg border-2 border-gold mt-2"
                  alt="Avatar"
                />
              </div>
              <div>
                <strong>
                  {i.user.firstName} {i.user.lastName}
                </strong>
                <small className="block opacity-70 mb-1">
                  {new Date(i.createdAt).toLocaleString()}
                </small>
                <WysiwygGeneratedContent content={i.message} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      { user?.id === ownerId && (
        <fetcher.Form
          ref={formRef}
          method="post"
          className="mx-auto shrink-0"
          encType="multipart/form-data"
          action={"/dashboard/action/add-chat-message/" + roomId}
        >
          <WysiwygField
            className="max-w-2xl w-full mx-auto"
            editorClassName="h-32"
            name="content"
            defaultValue=""
            modules={{
              toolbar: [
                ['bold', 'italic', 'underline','strike', 'blockquote'],
              ],
            }}
            formats={[
              'bold', 'italic', 'underline', 'strike', 'blockquote',
            ]}
          />
          <Button
            className={clsx(
              "mx-auto mt-14",
              fetcher.state === "submitting" && "opacity-50 cursor-not-allowed a"
            )}
            type="submit"
            icon={ fetcher.state === "submitting" ? CgSpinner : FiSend }
          >
            {t("common.submit")}
          </Button>
        </fetcher.Form>
      )}
    </div>
  );
}