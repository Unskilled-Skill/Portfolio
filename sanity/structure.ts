import {BookIcon, BulbOutlineIcon, DocumentsIcon, EarthGlobeIcon, StarIcon} from '@sanity/icons';
import type {StructureResolver} from 'sanity/structure';

const projectOrdering = [{field: 'navOrder', direction: 'asc' as const}];
const skillOrdering = [{field: 'order', direction: 'asc' as const}];
const localizedProjectFilter = '_type == "project" && defined(language)';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio CMS')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(EarthGlobeIcon)
        .child(
          S.documentList()
            .title('Site settings')
            .schemaType('siteSettings')
            .filter('_type == "siteSettings"')
            .defaultOrdering([{field: 'language', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('Featured projects')
        .icon(StarIcon)
        .child(
          S.documentList()
            .title('Featured projects')
            .schemaType('project')
            .filter(`${localizedProjectFilter} && featured == true`)
            .defaultOrdering(projectOrdering),
        ),
      S.listItem()
        .title('Projects by language')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Projects by language')
            .items([
              S.listItem()
                .title('English projects')
                .child(
                  S.documentList()
                    .title('English projects')
                    .schemaType('project')
                    .filter(`${localizedProjectFilter} && language == "en"`)
                    .defaultOrdering(projectOrdering),
                ),
              S.listItem()
                .title('Dutch projects')
                .child(
                  S.documentList()
                    .title('Dutch projects')
                    .schemaType('project')
                    .filter(`${localizedProjectFilter} && language == "nl"`)
                    .defaultOrdering(projectOrdering),
                ),
              S.listItem()
                .title('All localized projects')
                .child(
                  S.documentList()
                    .title('All localized projects')
                    .schemaType('project')
                    .filter(localizedProjectFilter)
                    .defaultOrdering(projectOrdering),
                ),
            ]),
        ),
      S.listItem()
        .title('Coming soon')
        .icon(BookIcon)
        .child(
          S.documentList()
            .title('Coming soon projects')
            .schemaType('project')
            .filter(`${localizedProjectFilter} && title == "Coming Soon"`)
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
            .filter('_type == "skill" && defined(language)')
            .defaultOrdering(skillOrdering),
        ),
    ]);
