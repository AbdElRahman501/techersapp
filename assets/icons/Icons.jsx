import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";
export const Mail_OutLine_Svg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || "#A1A8B0"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5Z"
    />
    <Path
      stroke={props.color || "#A1A8B0"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m17 9-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9"
    />
  </Svg>
);

export const Parent_Phone_Svg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#A1A8B0"}
      d="M8.23 20.314a3.897 3.897 0 0 0-.028 1.794C3.645 21.464 1 18.248 1 15.112v-.89a2.667 2.667 0 0 1 2.667-2.666h10.708c.026.631.226 1.246.583 1.778H3.667a.889.889 0 0 0-.89.889v.889c0 2.227 1.935 4.622 5.454 5.202ZM9.89 0a4.89 4.89 0 1 1 0 9.779A4.89 4.89 0 0 1 9.89 0Zm0 1.778A3.111 3.111 0 1 0 9.89 8a3.111 3.111 0 0 0 0-6.222Zm6.371 9.033.503-1.333c.459-1.21 1.888-1.807 3.094-1.293l.69.295c.84.36 1.537 1.01 1.683 1.885C23.044 15.21 18.84 22.1 14 23.859c-.875.316-1.82.07-2.57-.438l-.614-.417a2.105 2.105 0 0 1-.363-3.183l.969-1.079a1.894 1.894 0 0 1 1.838-.574l2.178.515c1.726-1.079 2.652-2.595 2.777-4.55l-1.561-1.53a1.665 1.665 0 0 1-.393-1.792Z"
    />
  </Svg>
);

export const User_Icon_Svg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G
      stroke={props.color || "#A1A8B0"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7" />
    </G>
  </Svg>
);

export const Student_Phone_SVG = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill={props.color || "#A1A8B0"} clipPath="url(#a)">
      <Path
        d="M22.57 4.514 11.738 8.126.903 4.514 11.737.903 22.57 4.514Z"
        opacity={0.2}
      />
      <Path d="M20.648 3.304 10.861.042a.816.816 0 0 0-.516 0L.558 3.304a.816.816 0 0 0-.55.689.51.51 0 0 0-.008.085v8.156a.816.816 0 1 0 1.631 0V5.21l3.425 1.14a6.525 6.525 0 0 0 2.105 8.978c-1.835.72-3.421 2.021-4.582 3.801a.815.815 0 1 0 1.367.891c1.536-2.357 3.962-3.708 6.657-3.708s5.121 1.351 6.658 3.708a.816.816 0 0 0 1.366-.89c-1.16-1.78-2.753-3.083-4.582-3.802a6.525 6.525 0 0 0 2.105-8.972l4.498-1.499a.816.816 0 0 0 0-1.548v-.005Zm-5.151 6.483a4.893 4.893 0 1 1-8.834-2.9l3.682 1.223a.816.816 0 0 0 .516 0l3.682-1.223c.62.84.954 1.857.954 2.9Zm-4.894-3.306L3.395 4.078l7.208-2.403 7.208 2.403-7.208 2.403Z" />
      <Path
        stroke="#fff"
        d="M17.552 9.194v.001l-.513 1.249c-.16.382-.194.8-.098 1.202.095.402.316.763.627 1.041l1.405 1.266c-.17 1.478-.948 2.65-2.397 3.532l-2.03-.441a2.595 2.595 0 0 0-1.26.042c-.41.117-.782.335-1.077.634l-.001.001-.985 1.009c-.262.258-.463.57-.585.912-.124.344-.165.71-.12 1.072.044.362.174.708.377 1.015l.416-.275-.416.275c.202.306.472.565.789.762l.626.39c.851.532 1.971.817 3.042.461h.001c2.601-.869 4.988-2.984 6.617-5.438 1.624-2.448 2.557-5.33 2.111-7.777-.193-1.063-1.091-1.775-2.026-2.142l-.703-.277c-1.452-.569-3.216.07-3.8 1.486Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const School_SVG = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke={props.color || "#A1A8B0"}
        strokeWidth={1.6}
        d="m12 7.2 6.4 3.2v12.8H5.6V10.4L12 7.2Zm0 0V0M0 23.2h24m-21.6 0v-9.6h3.2m16 9.6v-9.6h-3.2m-8 9.6v-4.8h3.2v4.8M12 .8h4.8V4H12m0 11.2a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const Lock_Svg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      stroke={props.color || "#A1A8B0"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 10V8c0-3.31 1-6 6-6s6 2.69 6 6v2M17 22H7c-4 0-5-1-5-5v-2c0-4 1-5 5-5h10c4 0 5 1 5 5v2c0 4-1 5-5 5Z"
    />
    <Path
      stroke={props.color || "#A1A8B0"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.996 16h.01M11.995 16h.01M7.995 16h.008"
    />
  </Svg>
);

export const Calender_Svg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={props.color || "#A1A8B0"}
      fillRule="evenodd"
      d="M4 10a1.334 1.334 0 0 0-1.333 1.333v1.334A1.333 1.333 0 0 0 4 14h1.333a1.334 1.334 0 0 0 1.334-1.333v-1.334A1.333 1.333 0 0 0 5.333 10H4Zm0 1.333v1.334h1.333v-1.334H4Zm4 0A1.333 1.333 0 0 1 9.333 10h1.334A1.334 1.334 0 0 1 12 11.333v1.334A1.334 1.334 0 0 1 10.667 14H9.333A1.334 1.334 0 0 1 8 12.667v-1.334Zm1.333 0h1.334v1.334H9.333v-1.334ZM14.667 10a1.333 1.333 0 0 0-1.334 1.333v1.334A1.333 1.333 0 0 0 14.667 14H16a1.333 1.333 0 0 0 1.333-1.333v-1.334A1.333 1.333 0 0 0 16 10h-1.333Zm0 1.333v1.334H16v-1.334h-1.333Zm-12 5.334A1.333 1.333 0 0 1 4 15.333h1.333a1.333 1.333 0 0 1 1.334 1.334V18a1.333 1.333 0 0 1-1.334 1.333H4A1.333 1.333 0 0 1 2.667 18v-1.333Zm2.666 0V18H4v-1.333h1.333Zm4-1.334A1.333 1.333 0 0 0 8 16.667V18a1.333 1.333 0 0 0 1.333 1.333h1.334A1.333 1.333 0 0 0 12 18v-1.333a1.333 1.333 0 0 0-1.333-1.334H9.333Zm1.334 1.334H9.333V18h1.334v-1.333Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color || "#A1A8B0"}
      d="M20 17.667a.667.667 0 1 0-1.333 0v1.942l.862.862a.666.666 0 0 0 .942-.942L20 19.057v-1.39Z"
    />
    <Path
      fill={props.color || "#A1A8B0"}
      fillRule="evenodd"
      d="M4 .667a.667.667 0 0 1 1.333 0V4a.667.667 0 1 0 1.334 0V2h6.666V.667a.667.667 0 0 1 1.334 0V4A.667.667 0 1 0 16 4V2h2a2 2 0 0 1 2 2v10.713A4.667 4.667 0 1 1 15.503 22H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2V.667Zm10.667 18.666a4.667 4.667 0 0 1 4-4.62V8H1.333v12a.667.667 0 0 0 .667.667h12.86a4.667 4.667 0 0 1-.193-1.334Zm8 0a3.334 3.334 0 1 1-6.668 0 3.334 3.334 0 0 1 6.668 0Z"
      clipRule="evenodd"
    />
  </Svg>
);

export const Language_Svg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <G fill={props.color || "#A1A8B0"} clipPath="url(#a)">
      <Path d="M15.458 0H0v15.458h8.95V24h15.457V8.542h-8.95V0Zm-8.73 3.661-2.554 7.286h1.724l.416-1.184h2.635v4.068H1.627V1.627h12.204v6.915h-3.39L8.73 3.661H6.727Zm1.846 4.475h-1.69l.845-2.413.845 2.413ZM22.78 10.17v12.203H10.576V10.169H22.78Z" />
      <Path d="M14.88 17.273c.143.23.301.451.472.661-.543.294-1.16.44-1.852.441v1.5c1.132 0 2.143-.3 3-.882.857.582 1.868.882 3 .882v-1.5c-.69 0-1.307-.147-1.852-.441.171-.21.329-.431.472-.662.433-.702.75-1.47.942-2.272h.813v-1.5H17.25v-1.125h-1.5V13.5h-2.625V15h.813c.191.803.51 1.57.942 2.273ZM17.51 15a6.235 6.235 0 0 1-.662 1.477 4.9 4.9 0 0 1-.348.49 4.841 4.841 0 0 1-.325-.452A6.205 6.205 0 0 1 15.491 15h2.018Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const Address_Mark_Svg = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={props.color || "#A1A8B0"}
      d="M12.4 5.4a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0-5.4a8.4 8.4 0 0 1 8.4 8.4c0 6.3-8.4 15.6-8.4 15.6S4 14.7 4 8.4A8.4 8.4 0 0 1 12.4 0Zm0 2.4a6 6 0 0 0-6 6c0 1.2 0 3.6 6 11.652 6-8.052 6-10.452 6-11.652a6 6 0 0 0-6-6Z"
    />
  </Svg>
);

export const Home_icon_Svg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || "#ADADAD"}
      strokeWidth={2}
      d="M8.144 19.782v-3.067c0-.777.632-1.408 1.414-1.413h2.875c.786 0 1.423.633 1.423 1.413v3.058c0 .674.548 1.222 1.227 1.227h1.96a3.46 3.46 0 0 0 2.444-1 3.41 3.41 0 0 0 1.013-2.422V8.866c0-.735-.328-1.431-.895-1.902l-6.662-5.29a3.115 3.115 0 0 0-3.958.071L2.467 6.963A2.474 2.474 0 0 0 1.5 8.867v8.703C1.5 19.464 3.047 21 4.956 21h1.916c.327.002.641-.125.873-.354.232-.228.363-.54.363-.864h.036Z"
    />
  </Svg>
);

export const Calender_home_Svg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || "#ADADAD"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.093 8.404h17.824M14.442 12.31h.01M10.005 12.31h.009M5.558 12.31h.01M14.442 16.196h.01M10.005 16.196h.009M5.558 16.196h.01M14.044 1v3.29M5.966 1v3.29"
    />
    <Path
      stroke={props.color || "#ADADAD"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14.238 2.58H5.771C2.834 2.58 1 4.214 1 7.221v9.05C1 19.326 2.834 21 5.771 21h8.458C17.175 21 19 19.355 19 16.348V7.222c.01-3.007-1.816-4.643-4.762-4.643Z"
      clipRule="evenodd"
    />
  </Svg>
);

export const Notification_icon_Svg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || "#101623"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.366 16.848c5.341 0 7.812-.724 8.05-3.627 0-2.902-1.722-2.716-1.722-6.276C15.694 4.165 13.197 1 9.366 1 5.534 1 3.038 4.164 3.038 6.945c0 3.56-1.723 3.374-1.723 6.275.24 2.915 2.71 3.628 8.05 3.628Z"
      clipRule="evenodd"
    />
    <Path
      stroke={props.color || "#101623"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.629 19.857c-1.293 1.515-3.308 1.533-4.613 0"
    />
  </Svg>
);

export const Search_icon_Svg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M.5.5h14.608v14.608H.5V.5Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={props.color || "#ADADAD"}
        fillRule="evenodd"
        d="M7.804 1.625a6.186 6.186 0 0 0-6.18 6.178 6.186 6.186 0 0 0 6.18 6.18 6.186 6.186 0 0 0 6.179-6.18 6.185 6.185 0 0 0-6.179-6.178Zm0 13.483C3.777 15.108.5 11.83.5 7.803.5 3.776 3.777.5 7.804.5c4.028 0 7.304 3.276 7.304 7.303 0 4.028-3.276 7.305-7.304 7.305Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="b"
      width={5}
      height={5}
      x={11}
      y={12}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M11.93 12.28h3.768v3.761H11.93v-3.76Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#b)">
      <Path
        fill={props.color || "#ADADAD"}
        fillRule="evenodd"
        d="M15.136 16.041a.563.563 0 0 1-.398-.164l-2.643-2.636a.563.563 0 0 1 .795-.797l2.643 2.636a.562.562 0 0 1-.397.961Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
export const Next_Icon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#199A8E"}
      d="M1.62 0 .36 1.35 7.02 8.1.36 14.85l1.26 1.35 8.1-8.1L1.62 0Z"
    />
  </Svg>

)
export const Plus_Icon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#A1A8B0"}
      d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0Zm0 37.54c-9.65 0-17.5-7.89-17.5-17.54 0-9.65 7.85-17.5 17.5-17.5S37.5 10.35 37.5 20 29.65 37.54 20 37.54Zm8.75-18.79h-7.5v-7.5a1.25 1.25 0 0 0-2.5 0v7.5h-7.5a1.25 1.25 0 0 0 0 2.5h7.5v7.5a1.25 1.25 0 0 0 2.5 0v-7.5h7.5a1.25 1.25 0 0 0 0-2.5Z"
    />
  </Svg>
)