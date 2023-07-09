import { Post } from './interfaces/posts';

// Copy of e621.net's blacklists.js logic

export interface BlacklistEntry {
  require: string[],
  exclude: string[],
  optional: string[],
  scoreComparison: [string, number] | null,
  // username: string | null,
  userId: number | null,
}

const normalizeComparisonOperator = (operator: string) => {
  switch(operator) {
    case '=>':
      return '>=';
    case '=<':
      return '<=';
    case '=':
    case '':
      return '==';
    default:
      return operator;
  }
}

const parseBlacklistEntry = (tags: string) => {
  const require: string[] = [];
  const exclude: string[] = [];
  const optional: string[] = [];
  let scoreComparison: [string, number] | null = null;
  const matches = tags.match(/\S+/g) || [];
  for (const tag of matches) {
    if (tag.charAt(0) === '-') {
      exclude.push(tag.slice(1));
    } else if (tag.charAt(0) === '~') {
      optional.push(tag.slice(1));
    } else {
      const score = tag.match(/^score:[<=>]{0,2}-?\d+/);
      if (score) {
        scoreComparison = [normalizeComparisonOperator(score[1]), parseInt(score[2], 10)];
      } else {
        require.push(tag);
      }
    }
  }
  // We cant get username directly from posts, so this is pointless
  // const userMatches = tags.match(/user:([\w\d]+)/) || [];
  // const username = userMatches.length === 2 ? userMatches[1] : null;
  const useridMatches = tags.match(/userid:(\d+)/) || [];
  const userId = useridMatches.length === 2 ? parseInt(useridMatches[1], 10) : null;
  return {
    require: require,
    exclude: exclude,
    optional: optional,
    scoreComparison: scoreComparison,
    // username: username,
    userId: userId,
  } as BlacklistEntry;
}

export const parseBlacklistEntries = (blacklistTags: string[]) => {
  return blacklistTags
  .map(e => e.replace(/(rating:[qes])\w+/ig, "$1").toLowerCase())
  .filter(e => e.trim() !== "")
  .map(e => parseBlacklistEntry(e));
}

const rangeComparator = (comparison: [string, number] | null, target: number) => {
  if (comparison === null) return true;
  switch (comparison[0]) {
    case '<':
      return target < comparison[1];
    case '<=':
      return target <= comparison[1];
    case '==':
      return target === comparison[1];
    case '>=':
      return target >= comparison[1];
    case '>':
      return target > comparison[1];
    default:
      return true;
  }
}

function isSubset<T>(array: T[], subarray: T[]) {
  return !subarray.some(item => !array.includes(item));
}

function intersect<T>(a: T[], b: T[]) {
  a = a.slice(0).sort();
  b = b.slice(0).sort();
  const result: T[] = [];
  while (a.length > 0 && b.length > 0) {
    if (a[0] < b[0]) {
      a.shift();
    } else if (a[0] > b[0]) {
      b.shift();
    } else { // a[0] === b[0]
      result.push(a.shift() as T);
      b.shift();
    }
  }
  return result;
}

const postMatchesBlacklist = (post: Post, entry: BlacklistEntry) => {
  const scoreTest = rangeComparator(entry.scoreComparison, post.score.total);
  const tags = [
    ...post.tags.artist,
    ...post.tags.character,
    ...post.tags.copyright,
    ...post.tags.general,
    ...post.tags.invalid,
    ...post.tags.lore,
    ...post.tags.meta,
    ...post.tags.species,
  ];
  tags.push(`id:${post.id}`)
  tags.push(`rating:${post.rating}`);
  tags.push(`userid:${post.uploader_id}`);
  // tags.push(`user:${post.uploader_user}`);  // not directly available :(
  tags.push(`height:${post.file.height}`);  // Should be comparison, but this is the original e621 behavior
  tags.push(`width:${post.file.width}`);  // Should be comparison, but this is the original e621 behavior
  if(post.is_favorited) {
    tags.push('fav:me');
  }
  if (post.flags.pending) {
    tags.push('status:pending');
  } else if (post.flags.deleted) {
    tags.push('status:deleted');
  } else if (post.flags.flagged) {
    tags.push('status:flagged');
  } else {
    tags.push('status:active');
  }

  return (isSubset(tags, entry.require) && scoreTest)
    && (entry.optional.length === 0 || intersect(tags, entry.optional).length > 0)
    && intersect(tags, entry.exclude).length === 0
}

export const postMatchesBlacklists = (post: Post, entries: BlacklistEntry[]) => {
  return entries.some(entry => postMatchesBlacklist(post, entry));
}
