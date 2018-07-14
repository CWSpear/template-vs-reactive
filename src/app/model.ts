export interface Job {
  name?: string;
  position?: string;
  likedItThere?: boolean;
}

export interface Employee {
  name?: string;

  favoriteColors?: string[];

  jobs?: Job[];
}
