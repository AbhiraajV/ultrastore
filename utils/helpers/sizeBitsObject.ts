export const image_size = {
  R_240p: {
    total_pixels: 320 * 240,
    w_h: { width: 320, height: 240 },
    min_size: 819200,
    max_size: 4096000,
    common_name: "SD",
  },
  R_360p: {
    total_pixels: 480 * 360,
    w_h: { width: 480, height: 360 },
    min_size: 1440000,
    max_size: 8192000,
    common_name: "HD 360p",
  },
  R_480p: {
    total_pixels: 640 * 480,
    w_h: { width: 640, height: 480 },
    min_size: 1920000,
    max_size: 12288000,
    common_name: "HD 480p",
  },
  R_720p: {
    total_pixels: 1280 * 720,
    w_h: { width: 1280, height: 720 },
    min_size: 3840000,
    max_size: 20971520,
    common_name: "HD 720",
  },
  R_1080p: {
    total_pixels: 1920 * 1080,
    w_h: { width: 1920, height: 1080 },
    min_size: 7680000,
    max_size: 41943040,
    common_name: "Full HD",
  },
  R_1440p: {
    total_pixels: 2560 * 1440,
    w_h: { width: 2560, height: 1440 },
    min_size: 11520000,
    max_size: 62914560,
    common_name: "Quad HD",
  },
  R_2160p: {
    total_pixels: 3840 * 2160,
    w_h: { width: 3840, height: 2160 },
    min_size: 23040000,
    max_size: 125829120,
    common_name: "4K",
  },
  R_4320p: {
    total_pixels: 7680 * 4320,
    w_h: { width: 7680, height: 4320 },
    min_size: 46080000,
    max_size: 251658240,
    common_name: "8K",
  },
};

export const bitsToMbs = (bits: number): number => {
  const megabits = bits / (8 * 1024 * 1024);
  return parseFloat(megabits.toFixed(2));
};

const calculatePercentageDifference = (num1: number, num2: number): number =>
  (num2 / num1 - 1) * 100;
type ImageSizeData = {
  imagesNeeded: number;
  max_size: number;
  min_size: number;
  percentageDifference: {
    max: number;
    min: number;
  };
};

export type ImageSizeObjectKeyType = keyof typeof image_size;
export type SizeBasedAnalysisData = Record<
  ImageSizeObjectKeyType,
  ImageSizeData
>;

export function findSmallestResolution(data: SizeBasedAnalysisData): {
  idealResolution: ImageSizeObjectKeyType;
} {
  let idealResolution = "";
  let smallestSize = Infinity;

  for (const resolution in data) {
    const { max_size, min_size } = data[resolution as ImageSizeObjectKeyType];
    const combinedSize = max_size + min_size;

    if (combinedSize < smallestSize) {
      smallestSize = combinedSize;
      idealResolution = resolution;
    }
  }

  return { idealResolution } as {
    idealResolution: ImageSizeObjectKeyType;
  };
}
export const getSizeBasedAnalysis = (
  fileSize: number
): { data: SizeBasedAnalysisData; fileSize: number } => {
  const data: SizeBasedAnalysisData = {
    R_240p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
    R_360p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
    R_480p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
    R_720p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
    R_1080p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
    R_1440p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
    R_2160p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
    R_4320p: {
      imagesNeeded: 0,
      max_size: 0,
      min_size: 0,
      percentageDifference: {
        max: 0,
        min: 0,
      },
    },
  };

  (Object.keys(image_size) as ImageSizeObjectKeyType[]).forEach(
    (key: ImageSizeObjectKeyType) => {
      const imageSizeData = image_size[key];
      const imagesNeeded = Math.ceil(fileSize / imageSizeData.total_pixels);

      data[key] = {
        imagesNeeded,
        max_size: bitsToMbs(imagesNeeded * imageSizeData.max_size),
        min_size: bitsToMbs(imagesNeeded * imageSizeData.min_size),
        percentageDifference: {
          max: calculatePercentageDifference(
            bitsToMbs(fileSize),
            bitsToMbs(imagesNeeded * imageSizeData.max_size)
          ),
          min: calculatePercentageDifference(
            bitsToMbs(fileSize),
            bitsToMbs(imagesNeeded * imageSizeData.min_size)
          ),
        },
      };
    }
  );

  const fileSizeInMbs = bitsToMbs(fileSize);
  console.log({ data, fileSize: fileSizeInMbs });

  return { data, fileSize: fileSizeInMbs };
};
