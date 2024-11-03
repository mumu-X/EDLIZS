
import Realm, { ObjectSchema } from 'realm';

// Define MedicalGuidelineTopic model with subtopics and other properties
export class MedicalGuidelineTopics extends Realm.Object<MedicalGuidelineTopics> {
  label!: string;
  subtopics!: string[];

  static schema: ObjectSchema = {
    name: 'MedicalGuidelineTopic',
    properties: {
      label: 'string',
      subtopics: 'string[]', // Array of strings
    },
  };
}

// Define MedicalGuidelineTopic model with subtopics and other properties
export class Drugslist extends Realm.Object<Drugslist> {
  label!: string;
  subtopics!: string[];

  static schema: ObjectSchema = {
    name: 'Drugslist',
    properties: {
      label: 'string',
      subtopics: 'string[]', // Array of strings
    },
  };
}

// Define embedded Content object
class Content extends Realm.Object<Content> {
  type!: string;
  text!: string;

  static schema: ObjectSchema = {
    name: 'Content',
    embedded: true, // Mark as embedded
    properties: {
      type: 'string',
      text: 'string',
    },
  };
}

// Define embedded Section object
class Section extends Realm.Object<Section> {
  header!: string;
  content!: Content[];

  static schema: ObjectSchema = {
    name: 'Section',
    embedded: true, // Mark as embedded
    properties: {
      header: 'string',
      content: { type: 'list', objectType: 'Content' },
    },
  };
}

// Define embedded SArray object
class SArray extends Realm.Object<SArray> {
  subtopic!: string;
  sections!: Section[];

  static schema: ObjectSchema = {
    name: 'SArray',
    embedded: true, // Mark as embedded
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


// Export all schemas, including embedded ones
export const schemas = [
  MedicalGuidelineTopics.schema,
  Disease.schema,
  Content.schema,
  Section.schema,
  SArray.schema,
  Drugslist.schema,
];


