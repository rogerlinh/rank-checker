export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SingleSearchResult {
  rankingText: string;
  sources: GroundingChunk[];
}

export interface KeywordResult {
    keyword: string;
    status: 'pending' | 'loading' | 'success' | 'error';
    result?: SingleSearchResult;
    error?: string;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  keywords: string[];
  device: 'desktop' | 'mobile';
  country: string;
  city?: string;
  results: KeywordResult[];
}