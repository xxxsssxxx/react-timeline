import { FC } from "react";
type Props = {
  href?: string,
  classTitle?: string,
  text: string
}

const BaseTitle: FC<Props> = ({ href, classTitle, text }) => {
  if (href) {
    return (
      <a
        className={classTitle}
        href={href}
        target="_blank"
        rel="noreferrer"
        title={text}
      >
        {text}
      </a>
    );
  }
  return (
    <h3 className={classTitle} title={text}>
      {text}
    </h3>
  );
};

export default BaseTitle;
