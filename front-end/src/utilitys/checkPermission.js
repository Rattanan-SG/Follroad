export default async permissionName => {
  const result = await navigator.permissions.query({ name: permissionName });
  return result.state;
};
