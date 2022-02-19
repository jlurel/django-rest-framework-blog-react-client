const slugify = (title: string): string => {
  let slug = title
    .toString()
    .replace(/^\s+|s+$/g, '')
    .toLowerCase();

  // Remove accents, swap ñ for n, etc
  const from = 'áäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;';
  const to = 'aaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------';

  for (let i = 0, letter = from.length; i < letter; i += 1) {
    slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // Remove invalid characters, replace whitespace by -, collapse dashes
  slug = slug
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return slug;
};

export default slugify;
