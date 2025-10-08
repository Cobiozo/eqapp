import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Delta = Quill.import("delta");
const Break = Quill.import("blots/break");
const Embed = Quill.import("blots/embed");

const lineBreakMatcher = () => {
  let newDelta = new Delta();
  newDelta.insert({ break: "" });
  return newDelta;
};

class SmartBreak extends Break {
  length() {
    return 1;
  }
  value() {
    return "\n";
  }

  insertInto(parent, ref) {
    Embed.prototype.insertInto.call(this, parent, ref);
  }
}

SmartBreak.blotName = "break";
SmartBreak.tagName = "BR";
Quill.register(SmartBreak);

const defaultModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['image', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['clean', 'break'],
  ],
   clipboard: {
      matchers: [["BR", lineBreakMatcher]],
      matchVisual: false
    },
  keyboard: {
    bindings: {
      linebreak: {
        key: 13,
        shiftKey: true,
        handler: function(range) {
          const currentLeaf = this.quill.getLeaf(range.index)[0];
          const nextLeaf = this.quill.getLeaf(range.index + 1)[0];
          this.quill.
          // Now that we've inserted a line break, move the cursor forward
          this.quill.setSelection(range.index + 6, Quill.sources.SILENT);
        }
      }
    }
  }
};

type Props = {
  modules: any;
  formats: any;
  onChange: (value: string) => void;
  defaultValue?: string;
}

export default function WysiwygClient({ modules, formats, defaultValue, onChange }: Props) {
  return (
    <ReactQuill
    modules={{
      clipboard: {
        matchers: [["BR", lineBreakMatcher]],
        matchVisual: false
      },
      keyboard: {
        bindings: {
          linebreak: {
            key: 13,
            shiftKey: true,
            handler: function(range) {
              const currentLeaf = this.quill.getLeaf(range.index)[0];
              const nextLeaf = this.quill.getLeaf(range.index + 1)[0];
              this.quill.insertEmbed(range.index, "break", true, "user");
              // Insert a second break if:
              // At the end of the editor, OR next leaf has a different parent (<p>)
              if (nextLeaf === null || currentLeaf.parent !== nextLeaf.parent) {
                this.quill.insertEmbed(range.index, "break", true, "user");
              }
              // Now that we've inserted a line break, move the cursor forward
              this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
            }
          }
        }
      }
    }}
  />
  );
}
