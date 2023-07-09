export const optimizeTags = (tags: string) => {
  // TODO: handle negated metatags
  const metatags: {[tag: string]: string} = {};
  const matches = tags.match(/\S+/g) || [];
  for (const tag of matches) {
    const metatagMatch = tag.match(/^(\S+):(\S+)/i);
    if (metatagMatch) {
      metatags[metatagMatch[1].toLowerCase()] = metatagMatch[2].toLowerCase();
    }
  }
  console.log(metatags);
  if (metatags.order === 'random' && metatags.randseed === undefined) {
    tags = `${tags} randseed:${Date.now()}`
  }
  console.log(tags);
  return tags;
}
