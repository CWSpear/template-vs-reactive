export interface Employee {
  name?: string;
  favoriteColors?: string[];
  jobs?: Job[];
}

export interface Job {
  name?: string;
  position?: string;
  likedItThere?: boolean;
}
