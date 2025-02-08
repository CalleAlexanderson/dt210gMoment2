## Todo-lista

Detta projekt består av en frontend och ett backend API gjort med fastify som ansluter till en mongodb databas där det lagras dokument som består av tre string fält (titel, status, description). 

Frontend använder React där de todos från databasen skrivs ut på skärmen och användaren kan lägga till nya todo i listan, uppdatera nuvarande todods och sedan ta bort todos. Projektet är uppdelat i dessa komponenter: 
TodoList, där komponenterna hämtas från backend. TodoForm, en childcomponent till todolist där formuläret för att lägga till todos ligger och funktionen för att lägga till nya todos. 
Todo, en till childcomponent till todolist som i sig har de enskilda todo på listan, i denna komponent ligger funktionerna som tar bort samt uppdaterar todods. UpdateForm, som används för att uppdatera en todo och är en childcomponent till Todo.
