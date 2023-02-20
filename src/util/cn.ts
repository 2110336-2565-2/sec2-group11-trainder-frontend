export default function cn(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
