export function Image({ src }) {
  return <img style={{ margin: '4px' }} width="300px" height="300px" src={src} alt="" loading="lazy" />;
}
