const listenToScroll = (setIsLoading) => {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const position = Math.round((winScroll / height) * 100);
  if (position > 90) setIsLoading(true);
};

export default listenToScroll;
