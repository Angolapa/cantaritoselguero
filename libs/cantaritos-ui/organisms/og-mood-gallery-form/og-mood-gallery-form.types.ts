export interface MoodGalleryFormValues {
  title: string;
  altEs: string;
  altEn: string;
  section: string;
  order: string;
}

export interface OgMoodGalleryFormProps {
  defaultValues?: Partial<MoodGalleryFormValues>;
  onSubmit: (values: MoodGalleryFormValues) => void;
  isLoading?: boolean;
}
