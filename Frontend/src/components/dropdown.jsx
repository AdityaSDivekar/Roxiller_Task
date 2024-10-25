// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useState } from "react"

// export function DropdownMenuDemo() {
//   const [selectedMonth, setSelectedMonth] = useState("March")

//   const months = [
//     "January", "February", "March", "April", "May",
//     "June", "July", "August", "September", "October",
//     "November", "December"
//   ]

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline">{selectedMonth}</Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>Select Month</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuGroup>
//           {months.map((month) => (
//             <DropdownMenuItem
//               key={month}
//               onClick={() => setSelectedMonth(month)}
//             >
//               {month}
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuGroup>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import axios from 'axios';

export function DropdownMenuDemo({ onMonthSelect }) {
  const [selectedMonth, setSelectedMonth] = useState("March");

  const months = [
    "January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October",
    "November", "December"
  ];

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    onMonthSelect(month);  // Trigger the API call to fetch statistics based on the selected month
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedMonth}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Month</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {months.map((month) => (
            <DropdownMenuItem
              key={month}
              onClick={() => handleMonthSelect(month)}
            >
              {month}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
