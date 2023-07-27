import "./Banner.css";

export default function Banner(props: {
  show: boolean;
  headline: string;
  sub?: string;
  type: "red" | "orange" | "green";
}) {
  return (
    <div className={props.show ? "BannerContainer " + props.type : "invisible"}>
      <h1>{props.headline}</h1>
      <h2>{props.sub}</h2>
    </div>
  );
}
