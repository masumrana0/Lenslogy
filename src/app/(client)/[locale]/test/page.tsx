"use client";

import { useState } from "react";
import TextEditorWithPreview from "../(dashboard)/dashboard/articles/_components/article-form/text-editor";
 
export default function DemoPage() {
  const [content, setContent] = useState(`
    <h1>Welcome to the Text Editor</h1>
    <p>This is a <strong>rich text editor</strong> with <em>preview functionality</em>.</p>
    
    <h2>Features</h2>
    <ul>
      <li>Rich text formatting</li>
      <li>Live preview</li>
      <li>Split view mode</li>
      <li>Fullscreen editing</li>
      <li>Dark mode support</li>
    </ul>
    
    <h3>Table Example</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>30</td>
          <td>New York</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>25</td>
          <td>Los Angeles</td>
        </tr>
      </tbody>
    </table>
    
    <blockquote>
      This is a blockquote example to show how text formatting is preserved.
    </blockquote>
  `);

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Text Editor with Preview</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A fully-featured rich text editor with live preview, split view, and
          fullscreen mode.
        </p>
      </div>

      <TextEditorWithPreview
        value={content}
        onChange={setContent}
        placeholder="Start writing your content..."
        className="w-full"
      />
    </div>
  );
}
