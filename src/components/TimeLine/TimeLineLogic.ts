import { useState, useMemo, useEffect, MouseEvent } from "react";

import { TimeLineProps } from "../../interfaces/componentProps";
import { IBlock } from "../../interfaces/interfaces";
import { EOrder } from "../../enums/enums";
import {
  dateFormating,
  isDateObject,
  sortDates,
  sortString,
  daysBetween,
  TDate
} from "../../Utils/utils";

export const TimeLineLogic = (props: TimeLineProps) => {
  const {
    blocks,
    showTools = true,
    blocksLongRange = 0,
    maxBlocks = 5,
    blocksOffset = 5,
    blockLoadCount = "",
    autoBlocks = false,
    blocksOrder = EOrder.DESC,
    onBlockBulletClick = () => false,
    moreButton = "More"
  } = props;

  const [mappedBlocks, setMappedBlocks] = useState(blocks);
  const [loadCount, setLoadCount] = useState(blockLoadCount);
  const [toolsTitle] = useState("Tools to play");
  const [moreButtonText, setMoreButtonText] = useState(moreButton);
  const [blockLimit, setBlockLimit] = useState(maxBlocks);

  const mapBlocks = useMemo(
    () => (blocks: IBlock[]): IBlock[] => {
      const mapped: IBlock[] = blocks
        .sort((a: IBlock, b: IBlock) => {
          if (isDateObject(a.blockText) && isDateObject(b.blockText)) {
            return sortDates(a.blockText, b.blockText, blocksOrder);
          }

          if (
            typeof a.blockText === "string" &&
            typeof b.blockText === "string"
          ) {
            return sortString(a.blockText, b.blockText, blocksOrder);
          }

          return 1;
        })
        .map((block, i) => {
          const { blockText } = block;
          const prevBlock = blocks[i - 1];
          const isLongRange =
            i > 0 ? isLongRangeElement(blockText, prevBlock.blockText) : false;
          if (isDateObject(blockText)) {
            return {
              ...block,
              blockText: dateFormating(blockText, false),
              isLongRange
            };
          }
          return { ...block, isLongRange };
        });
      return mapped;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const emitBulletClick = (e: MouseEvent, block?: IBlock): void => {
    onBlockBulletClick(e, block);
  };

  const loadMoreBlocks = () => {
    setBlockLimit((prevSatate: number) => prevSatate + blocksOffset);
    if (loadCount && !isNaN(+loadCount)) {
      const count = `${+loadCount - blocksOffset}`;
      setLoadCount(count);
      setMoreButtonText(`${moreButton} (${count})`);
    }
  };

  const isLongRangeElement = (a: TDate, b: TDate): boolean => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    if (!isDateObject(aDate) || !isDateObject(bDate)) return false;
    const mapRangeConditions: { [key: string]: boolean } = {
      [EOrder.DESC]: blocksLongRange
        ? blocksLongRange <= daysBetween(a, b)
        : false,
      [EOrder.ASC]: blocksLongRange
        ? blocksLongRange <= daysBetween(b, a)
        : false
    };
    const isRangeLonger = mapRangeConditions[blocksOrder];
    return isRangeLonger;
  };

  useEffect(() => {
    if (autoBlocks) {
      setMappedBlocks(mapBlocks(blocks));
    }
    if (blockLimit < blocks.length) {
      if (!!blockLoadCount) {
        const count = `${blocks.length - blockLimit}`;
        setLoadCount(count);
        setMoreButtonText(`${moreButton} (${count})`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    mappedBlocks,
    toolsTitle,
    moreButtonText,
    blockLimit,
    showTools,
    moreButton,
    emitBulletClick,
    loadMoreBlocks
  };
};