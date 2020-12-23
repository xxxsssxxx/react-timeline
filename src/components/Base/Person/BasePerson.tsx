import React from "react";
import { IAssignee } from "../../../interfaces/interfaces";

type Props = {
  person: IAssignee;
};

const BasePerson: React.FC<Props> = ({ person }) => {
  const { name, href, avatar, className } = person;
  return (
    <div className={`person-wrapper ${className} m-0.5`} data-testid="person">
      {href ? (
        <a href={href} target="_blank" rel="noreferrer">
          {name}
        </a>
      ) : (name)
      }
      {avatar ? <img src={avatar} loading="lazy" alt={name} /> : null}
    </div>
  );
};

export default BasePerson;
