export const stringToArray = (input: string) => {
  if (!input) return []; // Kiểm tra chuỗi trống
  return input.split(',').map(item => item.trim()); // Tách chuỗi và loại bỏ khoảng trắng thừa
};
