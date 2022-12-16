export const Great = ({ width = 48, height = 48 }) => {
  return (
    <svg
      height={height || 24}
      width={width || 24}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-green-600"
    >
      <g>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
      </g>
    </svg>
  );
};

export const Good = ({ width = 48, height = 48 }) => {
  return (
    <svg
      height={height || 24}
      width={width || 24}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-lime-600"
    >
      <g>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75a.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25a.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
      </g>
    </svg>
  );
};

export const Neutral = ({ width = 48, height = 48 }) => {
  return (
    <svg
      height={height || 24}
      width={width || 24}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-teal-600"
    >
      <g>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
      </g>
    </svg>
  );
};

export const Bad = ({ width = 48, height = 48 }) => {
  return (
    <svg
      height={height || 24}
      width={width || 24}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-sky-700"
    >
      <g>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25a.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
      </g>
    </svg>
  );
};

export const Terrible = ({ width = 48, height = 48 }) => {
  return (
    <svg
      height={height || 24}
      width={width || 24}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-indigo-800"
    >
      <g>
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M9.146 5.146a.5.5 0 0 1 .708 0l.646.647l.646-.647a.5.5 0 0 1 .708.708l-.647.646l.647.646a.5.5 0 0 1-.708.708l-.646-.647l-.646.647a.5.5 0 1 1-.708-.708l.647-.646l-.647-.646a.5.5 0 0 1 0-.708zm-5 0a.5.5 0 0 1 .708 0l.646.647l.646-.647a.5.5 0 1 1 .708.708l-.647.646l.647.646a.5.5 0 1 1-.708.708L5.5 7.207l-.646.647a.5.5 0 1 1-.708-.708l.647-.646l-.647-.646a.5.5 0 0 1 0-.708zM10 11a2 2 0 1 1-4 0a2 2 0 0 1 4 0z" />
      </g>
    </svg>
  );
};
