export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Country = {
  au?: Maybe<Scalars['String']>,
  br?: Maybe<Scalars['String']>,
  ca?: Maybe<Scalars['String']>,
  cn?: Maybe<Scalars['String']>,
  es?: Maybe<Scalars['String']>,
  fr?: Maybe<Scalars['String']>,
  gb?: Maybe<Scalars['String']>,
  it?: Maybe<Scalars['String']>,
  jp?: Maybe<Scalars['String']>,
  mx?: Maybe<Scalars['String']>,
  nz?: Maybe<Scalars['String']>,
  tr?: Maybe<Scalars['String']>,
  ua?: Maybe<Scalars['String']>,
  us: Scalars['String'],
};

/** Film is a work of animation of any length. Could be feature-length; could be television-length. */
export type Film = {
   __typename?: 'Film',
  /** A unique ID for this film */
  ID: Scalars['String'],
  /** "Artists includes keyframe artists" */
  artists: Array<Person>,
  /** The composers of the film */
  composers: Array<Person>,
  /** The directors of the film */
  directors: Array<Person>,
  frameSequences: Array<FrameSequence>,
  keyframeArtists: Array<Person>,
  releases: Array<Release>,
  /** The earliest release date of the film */
  releaseYear: Scalars['Int'],
  /** The studio that produced the film */
  studio?: Maybe<Studio>,
  /** The original title of the film */
  title: Scalars['String'],
  /** The film’s localized title in foreign countries */
  titleIntl: TitleIntl,
  /** The website of the film */
  website?: Maybe<Scalars['String']>,
  /** The writers of the film */
  writers: Array<Person>,
};

export enum FilmOrderFields {
  ReleaseYearAsc = 'releaseYear_ASC',
  ReleaseYearDesc = 'releaseYear_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Frame = {
   __typename?: 'Frame',
  artists: Array<Maybe<Person>>,
  image: Image,
  keyframe: Scalars['Boolean'],
  notes?: Maybe<Scalars['String']>,
  order: Scalars['Int'],
};

export type FrameSequence = {
   __typename?: 'FrameSequence',
  ID: Scalars['String'],
  artists: Array<Maybe<Person>>,
  film: Film,
  frames: Array<Maybe<Frame>>,
  keyframeArtists: Array<Maybe<Person>>,
  notes?: Maybe<Scalars['String']>,
  order: Scalars['Int'],
};

export type Image = {
   __typename?: 'Image',
  name?: Maybe<Scalars['String']>,
  url: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addStudioToFilm?: Maybe<Film>,
  addIntlTitle?: Maybe<Film>,
  addPerson?: Maybe<Person>,
  addDirectorToFilm?: Maybe<Film>,
};


export type MutationAddStudioToFilmArgs = {
  studio: Scalars['String'],
  film: Scalars['String']
};


export type MutationAddIntlTitleArgs = {
  film: Scalars['String'],
  title: Country
};


export type MutationAddPersonArgs = {
  id: Scalars['String'],
  birthDay?: Maybe<Scalars['Int']>,
  birthMonth?: Maybe<Scalars['Int']>,
  birthYear?: Maybe<Scalars['Int']>,
  deathDay?: Maybe<Scalars['Int']>,
  deathMonth?: Maybe<Scalars['Int']>,
  deathYear?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  kanji?: Maybe<Scalars['String']>,
  location?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  surname: Scalars['String'],
  website?: Maybe<Scalars['String']>
};


export type MutationAddDirectorToFilmArgs = {
  person: Scalars['String'],
  film: Scalars['String']
};

export enum PeopleOrderFields {
  BirthDayAsc = 'birthDay_ASC',
  BirthDayDesc = 'birthDay_DESC',
  BirthMonthAsc = 'birthMonth_ASC',
  BirthMonthDesc = 'birthMonth_DESC',
  BirthYearAsc = 'birthYear_ASC',
  BirthYearDesc = 'birthYear_DESC',
  DeathDayAsc = 'deathDay_ASC',
  DeathDayDesc = 'deathDay_DESC',
  DeathMonthAsc = 'deathMonth_ASC',
  DeathMonthDesc = 'deathMonth_DESC',
  DeathYearAsc = 'deathYear_ASC',
  DeathYearDesc = 'deathYear_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SurnameAsc = 'surname_ASC',
  SurnameDesc = 'surname_DESC'
}

/** A person is usually an artist that worked on a film, but could also be a director, writer, or composer. */
export type Person = {
   __typename?: 'Person',
  /** A unique ID for this person */
  ID: Scalars['String'],
  /** Birthdays are split into day/month/year separately because we may not know all parts! */
  birthDay?: Maybe<Scalars['Int']>,
  /** Birthdays are split into day/month/year separately because we may not know all parts! */
  birthMonth?: Maybe<Scalars['Int']>,
  /** Birthdays are split into day/month/year separately because we may not know all parts! */
  birthYear?: Maybe<Scalars['Int']>,
  /** Death days are split into day/month/year separately because we may not know all parts! */
  deathDay?: Maybe<Scalars['Int']>,
  /** Death days are split into day/month/year separately because we may not know all parts! */
  deathMonth?: Maybe<Scalars['Int']>,
  /** Death days are split into day/month/year separately because we may not know all parts! */
  deathYear?: Maybe<Scalars['Int']>,
  /** A short bio for this person */
  description?: Maybe<Scalars['String']>,
  /** Films associated with this person */
  films?: Maybe<Array<Film>>,
  /** This person’s name in Kanji (Japanese only) */
  kanji?: Maybe<Scalars['String']>,
  /** The location of this person */
  location?: Maybe<Scalars['String']>,
  /** The first name of this person */
  name: Scalars['String'],
  /** The last name of this person */
  surname: Scalars['String'],
  /** The website of this person */
  website?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  film?: Maybe<Film>,
  films: Array<Maybe<Film>>,
  people: Array<Maybe<Person>>,
  person?: Maybe<Person>,
};


export type QueryFilmArgs = {
  id: Scalars['String']
};


export type QueryFilmsArgs = {
  orderBy?: Maybe<Array<FilmOrderFields>>,
  limit?: Maybe<Scalars['Int']>,
  yearStart?: Maybe<Scalars['Int']>,
  yearEnd?: Maybe<Scalars['Int']>
};


export type QueryPeopleArgs = {
  orderBy?: Maybe<Array<PeopleOrderFields>>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryPersonArgs = {
  id: Scalars['String']
};

export type Release = {
   __typename?: 'Release',
  ID: Scalars['String'],
  country: Scalars['String'],
  film?: Maybe<Film>,
  format: Scalars['String'],
  images: Array<Maybe<Image>>,
  notes?: Maybe<Scalars['String']>,
  region: Scalars['String'],
  releaseDay?: Maybe<Scalars['Int']>,
  releaseMonth?: Maybe<Scalars['Int']>,
  releaseYear: Scalars['Int'],
  runtime?: Maybe<Scalars['Int']>,
};

export type Studio = {
   __typename?: 'Studio',
  ID: Scalars['String'],
  city?: Maybe<Scalars['String']>,
  country: Scalars['String'],
  films: Array<Maybe<Film>>,
  foundedYear: Scalars['Int'],
  founders: Array<Maybe<Person>>,
  name: Scalars['String'],
};

/** TitleIntl is a map of 2-letter ISO country codes of all a film’s titles. */
export type TitleIntl = {
   __typename?: 'TitleIntl',
  au?: Maybe<Scalars['String']>,
  br?: Maybe<Scalars['String']>,
  ca?: Maybe<Scalars['String']>,
  cn?: Maybe<Scalars['String']>,
  es?: Maybe<Scalars['String']>,
  fr?: Maybe<Scalars['String']>,
  gb?: Maybe<Scalars['String']>,
  it?: Maybe<Scalars['String']>,
  jp?: Maybe<Scalars['String']>,
  mx?: Maybe<Scalars['String']>,
  nz?: Maybe<Scalars['String']>,
  tr?: Maybe<Scalars['String']>,
  ua?: Maybe<Scalars['String']>,
  us: Scalars['String'],
};

