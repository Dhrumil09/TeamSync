import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={35}
      viewBox="0 0 22 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_3_107)">
        <Path
          d="M22 11.667L11 0 0 11.667l11 11.666L22 35V11.667z"
          fill="#F6461A"
        />
        <Path d="M0 11.667l11 11.666L0 35V11.667z" fill="#DB342C" />
      </G>
      <Defs>
        <ClipPath id="clip0_3_107">
          <Path fill="#fff" transform="rotate(90 11 11)" d="M0 0H35V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
