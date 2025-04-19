import React from "react";
import { IComment } from ".";

const Comment: React.FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between mb-2">
        <h4 className="font-medium dark:text-white">{comment.author}</h4>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {comment.date}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
    </div>
  );
};

export default Comment;
