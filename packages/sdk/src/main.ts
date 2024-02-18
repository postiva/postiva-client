export async function greeter(name: string) {
  return `Hello, ${name}`;
}

greeter('Postiva').then((greeting) => {
  console.log(greeting);
})