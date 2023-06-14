import "./Banner.css";

export default function Banner(props: { headline: string; sub: string }) {
  return (
    <div className="BannerContainer">
      <h1>{props.headline}</h1>
      <h2>{props.sub}</h2>
    </div>
  );
}
