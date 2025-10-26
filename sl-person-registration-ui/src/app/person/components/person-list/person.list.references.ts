import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { TooltipModule } from "primeng/tooltip";

export const PERSON_IMPORTS = [
  CommonModule,
  FormsModule,
  TableModule,
  TagModule,
  ButtonModule,
  TooltipModule,
  IconFieldModule,
  InputIconModule,
  RouterLink,
];
