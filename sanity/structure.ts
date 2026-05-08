import {BookIcon, BulbOutlineIcon, DocumentsIcon, StarIcon} from '@sanity/icons';
import type {StructureResolver} from 'sanity/structure';

const projectOrdering = [{field: 'navOrder', direction: 'asc' as const}];
const skillOrdering = [{field: 'order', direction: 'asc' as const}];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio CMS')
    .items([
      S.listItem()
        .title('Featured projects')
        .icon(StarIcon)
        .child(
          S.documentList()
            .title('Featured projects')
            .schemaType('project')
            .filter('_type == "project" && featured == true')
            .defaultOrdering(projectOrdering),
        ),
      S.listItem()
        .title('All projects')
        .icon(DocumentsIcon)
        .child(
          S.documentList()
            .title('All projects')
            .schemaType('project')
            .filter('_type == "project"')
            .defaultOrdering(projectOrdering),
        ),
      S.listItem()
        .title('Coming soon')
        .icon(BookIcon)
        .child(
          S.documentList()
            .title('Coming soon projects')
            .schemaType('project')
            .filter('_type == "project" && title == "Coming Soon"')
            .defaultOrdering(projectOrdering),
        ),
      S.divider(),
      S.listItem()
        .title('Skills')
        .icon(BulbOutlineIcon)
        .child(
          S.documentList()
            .title('Skills')
            .schemaType('skill')
            .filter('_type == "skill"')
            .defaultOrdering(skillOrdering),
        ),
    ]);
