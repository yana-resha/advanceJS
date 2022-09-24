
export function errorWindow(error) {
  const errorContainer = document.createElement('div');
  errorContainer.style.position = 'absolute';
  errorContainer.style.bottom = '0px';
  errorContainer.style.right = '0px';
  errorContainer.style.width = 'auto';
  errorContainer.style.height = 'auto';
  errorContainer.style.border = '1px solid primary';

  const errorBlock = document.createElement('div');
  errorBlock.style.padding = '20px';
  errorBlock.textContent = error;


  errorContainer.append(errorBlock);
  return errorContainer;
}
