// check if attr name/description already exists
export function isUnique(data, attr, value) {
  return data.rows.filter((item) => item[attr] === value).length > 0;
}
