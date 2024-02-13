async function asyncWrapper(fn) {
  try {
    fn();
  } catch (err) {}
}
