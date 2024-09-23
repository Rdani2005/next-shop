import Image, { ImageProps } from "next/image";

type Props = ImageProps & { src: string };

export const ProductImage = ({ src, alt, ...props }: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return <Image {...props} src={localSrc} alt={alt} />;
};
