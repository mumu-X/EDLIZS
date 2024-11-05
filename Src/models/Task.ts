import Realm, { ObjectSchema } from 'realm';

// Define MedicalGuidelineTopic model
export class MedicalGuidelineTopics extends Realm.Object<MedicalGuidelineTopics> {
  label!: string;
  subtopics!: string[];

  static schema: ObjectSchema = {
    name: 'MedicalGuidelineTopic',
    properties: {
      label: 'string',
      subtopics: 'string[]',
    },
  };
}

// Define Drugslist model
export class Drugslist extends Realm.Object<Drugslist> {
  label!: string;
  subtopics!: string[];

  static schema: ObjectSchema = {
    name: 'Drugslist',
    properties: {
      label: 'string',
      subtopics: 'string[]',
    },
  };
}

// Define embedded Content object
export class Content extends Realm.Object<Content> {
  type!: string;
  text!: string;

  static schema: ObjectSchema = {
    name: 'Content',
    embedded: true,
    properties: {
      type: 'string',
      text: 'string',
    },
  };
}

// Define embedded Section object
export class Section extends Realm.Object<Section> {
  header!: string;
  content!: Content[];

  static schema: ObjectSchema = {
    name: 'Section',
    embedded: true,
    properties: {
      header: 'string',
      content: { type: 'list', objectType: 'Content' },
    },
  };
}

// Define embedded SArray object
export class SArray extends Realm.Object<SArray> {
  subtopic!: string;
  sections!: Section[];

  static schema: ObjectSchema = {
    name: 'SArray',
    embedded: true,
    properties: {
      subtopic: 'string',
      sections: { type: 'list', objectType: 'Section' },
    },
  };
}

// Define the main Disease object
export class Disease extends Realm.Object<Disease> {
  label!: string;
  SArray!: SArray[];

  static schema: ObjectSchema = {
    name: 'Disease',
    properties: {
      label: 'string',
      SArray: { type: 'list', objectType: 'SArray' },
    },
  };
}

// Export all schemas
export const schemas = [
  MedicalGuidelineTopics,
  Drugslist,
  Content,
  Section,
  SArray,
  Disease,
];