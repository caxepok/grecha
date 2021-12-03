export const createPathURL = (match, partial) => {
  if (!match || !partial) {
    return "";
  }
  const { path } = match;
  const params = { ...match.params, ...partial };

  let url = path;

  let i = 0;
  while (url.indexOf("*") > -1) {
    url = url.replace("*", params[i] || "").replace("//", "/");
    i++;
  }

  Object.keys(params).forEach(function (key) {
    const replacement = params[key] ? `${params[key]}` : "";
    url = url
      .replace(`:${key}?`, `:${key}`)
      .replace(`/:${key}`, replacement ? `/${replacement}` : "")
      .replace(`:${key}`, replacement);
  });

  return url.substr(-1) === "/" ? url.substr(0, url.length - 1) : url;
};
