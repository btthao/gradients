export interface Gradient {
  name: string;
  colors: string[];
  direction: string;
  stops: string[];
  tags: string[];
}

export type CreateGradientResponse = {
  completed?: boolean;
  error?: string;
};

export type GetGradientsReturn = {
  results: Gradient[];
  next: string | null;
};
