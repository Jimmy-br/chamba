import { Cloudinary } from "@cloudinary/url-gen";
import { CLOUDINARY_CLOUD_NAME } from "@env";
import { fill } from "@cloudinary/url-gen/actions/resize";

export const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true,
  }
});

// Función para obtener URL de imagen por publicId
export const getImageUrl = (publicId: string, width = 300, height = 200) => {
  return cld
    .image(publicId)
    .resize(fill().width(width).height(height))
    .toURL();
};