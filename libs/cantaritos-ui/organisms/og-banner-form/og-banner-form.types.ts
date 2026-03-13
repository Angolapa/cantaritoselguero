export interface BannerFormValues {
  title: string;
  altText: string;
  linkUrl: string;
  section: string;
  locale: string;
  order: string;
  backgroundColor: string;
  startDate: string;
  endDate: string;
}

export interface OgBannerFormProps {
  defaultValues?: Partial<BannerFormValues>;
  onSubmit: (values: BannerFormValues) => void;
  isLoading?: boolean;
}
