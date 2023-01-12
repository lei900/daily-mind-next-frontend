import { Dropdown } from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect, Key } from "react";
import Link from "next/link";

import {
  ChatIcon,
  HeartIcon,
  MoreIcon,
  AvatarIcon,
  DeleteIcon,
} from "components/Icons";
import { useAuthContext } from "context/AuthContext";
import { CommentData } from "types/types";
import useAxios from "hooks/useAxios";
import Date from "components/Date";

type Props = {
  comment: CommentData;
  entryId: number;
  onDeleteComment: (commentId: number) => void;
};

export const CommentListItem = ({ comment, onDeleteComment }: Props) => {
  const { currentUser, loading } = useAuthContext();
  const [isCommentAuthor, setIsCommentAuthor] = useState(false);

  const commentAuthor = comment.attributes.user;

  useEffect(() => {
    if (!loading) {
      if (currentUser && currentUser.uid === commentAuthor.uid) {
        setIsCommentAuthor(true);
      }
    }
  }, [currentUser]);

  const handleEntryAction = (key: Key) => {
    if (key === "delete") {
      onDeleteComment(comment.id);
    }
  };

  return (
    <div
      className="bg-white flex flex-row rounded-none sm:p-4 px-2 py-4 gap-2 border-slate-300 border-t-0 border-r-0 border-l-0 border"
      key={comment.id}
    >
      <div className="flex">
        <Link href={`/user/${commentAuthor.uid}`}>
          {commentAuthor.avatar ? (
            <div className="sm:w-11 sm:h-11 w-8 h-8">
              <Image
                src={commentAuthor.avatar}
                width={44}
                height={44}
                alt="Avatar"
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="cursor-pointer">
              <AvatarIcon className="sm:w-11 sm:h-11 w-8 h-8" />
            </div>
          )}
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-0.5">
            <Link href={`/user/${commentAuthor.uid}`}>
              <div className="text-sm font-semibold text-gray-700 hover:underline">
                {commentAuthor.nickname}
              </div>
            </Link>
            <Date
              className="text-xs text-slate-500"
              dateString={comment.attributes.createdAt}
            />
          </div>
          {isCommentAuthor && (
            <Dropdown placement="bottom-right">
              <Dropdown.Trigger>
                <div className="group rounded-full p-2 hover:bg-blue-100">
                  <MoreIcon />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Menu
                aria-label="Entry actions"
                onAction={(key) => {
                  handleEntryAction(key);
                }}
                css={{ $$dropdownMenuMinWidth: "130px" }}
              >
                <Dropdown.Item
                  key="delete"
                  icon={<DeleteIcon className="sm:w-6 sm:h-6 w-5 h-5" />}
                >
                  <p className="sm:text-base text-sm">削除</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <div className="p-0">
          <div className="whitespace-pre-line text-sm">
            {comment.attributes.body}
          </div>

          {/* comment reaction */}
          {/* <Card.Footer className="flex flex-row my-2 px-0 justify-between items-center">
            <button className="group inline-flex items-center p-2 rounded-xl hover:bg-pink-100">
              <HeartIcon className="stroke-gray-500	w-4 h-4 group-hover:stroke-pink-500" />
              <span className="text-xs text-gray-500 px-1 group-hover:text-pink-500">
                応援
              </span>
            </button>
          </Card.Footer> */}
        </div>
      </div>
    </div>
  );
};
