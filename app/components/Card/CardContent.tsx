import { Tag } from 'contentlayer/generated';
import TagItem from '../TagItem';
import React from 'react';

const CardContent = ({
  title,
  description,
  tags,
}: {
  title: string;
  description: string;
  tags: Tag[] | undefined;
}) => {
  return (
    <>
      <hgroup className="px-2 pt-1">
        <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
        <h2 className="text-xs md:text-sm text-gray-700 dark:text-gray-300">
          {description}
        </h2>
      </hgroup>
      <div className="flex flex-row gap-2 mt-2 px-2 pb-2">
        {tags?.map((tag) => <TagItem key={tag.title} title={tag.title} />)}
      </div>
    </>
  );
};

export default CardContent;
