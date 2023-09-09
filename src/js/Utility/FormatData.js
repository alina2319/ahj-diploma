export default function formatDate(data, day) {
  let created;

  if (!data) {
    created = new Date();
  } else {
    created = new Date(data);
  }

  const date = created.toLocaleDateString('ru');
  const time = created.toLocaleTimeString('ru', { hour: 'numeric', minute: 'numeric' });

  if (day) {
    return `${date}`;
  }

  return `${time} ${date}`;
}
