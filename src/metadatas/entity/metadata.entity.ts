class Attribute {
  trait_type: string;
  value: string;
}

export class MetadataEntity {
  id: string;
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
}
