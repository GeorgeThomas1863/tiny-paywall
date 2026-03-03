const displayElement = document.getElementById("display-element");

export const buildMainDisplay = async () => {
  if (!displayElement) return null;

  //   const data = await buildMainForm();
  const data = "Hello World";

  displayElement.append(data);

  return true;
};

if (displayElement) buildMainDisplay();
