import { Editor } from "@tinymce/tinymce-react";
import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
import React from "react";
import { toolbar } from "./tinymce.toolbar";

interface Props {
  value?: string;
  defaultValue?: string;
  init?: InitOptions;
  onChange?: (value: string) => void;
}

const TinyMce = ({ value, defaultValue, init, onChange }: Props) => {
  return (
    <React.Fragment>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        initialValue={defaultValue}
        value={value}
        init={{
          base_url: "/tinymce",
          // skin_url: "/ui/oxide",
          // content_css: "/default",
          // icons: "/default",
          min_height: 250,
          max_height: 500,
          menubar: false,
          statusbar: false,
          highlight_on_focus: false,
          plugins: [
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
            "supercode",
          ],
          toolbar: toolbar,
          ...init,
        }}
        onEditorChange={(value) => {
          if (onChange) onChange(value);
        }}
      />
    </React.Fragment>
  );
};
export default TinyMce;
