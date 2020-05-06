# @node-ts/logger



Defines a logger abstraction that can be injected (using inversify) into different applications. This removes the need for packages and applications to rely on a specific logger, but instead allow the consumer the choice to provide whichever logger they are most comfortable with.

This logger abstraction is used within all @node-ts/* projects, but can be used with any inversify enabled project.
