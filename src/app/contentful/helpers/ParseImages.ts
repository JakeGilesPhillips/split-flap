import { Asset, AssetLink, UnresolvedLink } from "contentful";

export interface ContentImage {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	tags?: string[];
}

export const parseContentfulImage = (asset?: Asset<undefined, string> | { sys: AssetLink }): ContentImage => {
	if (!asset || !("fields" in asset)) return { src: "", alt: "", width: 0, height: 0 };

	return {
		src: asset.fields.file?.url + "?fm=webp" || "",
		alt: asset.fields.description || "",
		width: asset.fields.file?.details.image?.width || 0,
		height: asset.fields.file?.details.image?.height || 0,
		tags: asset.metadata.tags.map((t) => t.sys.id),
	};
};

export const parseContentfulImages = (assets?: (Asset<undefined, string> | UnresolvedLink<"Asset">)[]): ContentImage[] => {
	if (!assets || !assets.length) return [];
	return assets.map((a) => parseContentfulImage(a));
};
