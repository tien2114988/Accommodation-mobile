import Svg, { Path } from "react-native-svg";

export default function FacebookSvg(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <Path
        fill="#1976D2"
        d="M17.5 0h-15A2.503 2.503 0 0 0 0 2.5v15C0 18.879 1.121 20 2.5 20h15c1.379 0 2.5-1.121 2.5-2.5v-15C20 1.121 18.879 0 17.5 0Z"
      />
      <Path
        fill="#FAFAFA"
        d="M16.875 10H13.75V7.5c0-.69.56-.625 1.25-.625h1.25V3.75h-2.5A3.75 3.75 0 0 0 10 7.5V10H7.5v3.125H10V20h3.75v-6.875h1.875L16.875 10Z"
      />
    </Svg>
  );
}
