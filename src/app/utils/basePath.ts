export function getBasePath() {
  return process.env.NODE_ENV === "production" ? "/apple-portfolio" : "";
}

export function withBasePath(path: string) {
  return `${getBasePath()}${path}`;
}
