"use client";
import React, { FC, useEffect, useState } from "react";

import Image, { ImageProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type ImageWithFallbackProps = {
  fallback: string;
} & ImageProps;

const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  alt,
  src,
  fallback,
  ...imageProps
}) => {
  const [imageSrc, setImageSrc] = useState<string | StaticImport>(src);
  useEffect(() => {
    setImageSrc(src);
  }, [src]);
  const onImageError = () => {
    setImageSrc(fallback);
  };
  return (
    <Image {...imageProps} src={imageSrc} alt={alt} onError={onImageError} />
  );
};

export default ImageWithFallback;
